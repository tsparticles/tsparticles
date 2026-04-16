#!/usr/bin/env python3
import argparse
import shutil
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

PALETTES_ROOT = ROOT / "palettes"
PALETTE_DEMO_IMAGES = ROOT / "demo" / "vanilla" / "public" / "images" / "palettes"

PRESETS_ROOT = ROOT / "presets"
PRESET_DEMO_IMAGES = ROOT / "demo" / "vanilla" / "public" / "images" / "presets"

SYNC_FROM_SAMPLES = "samples"
SYNC_FROM_DEMO = "demo"


def to_pascal_case(value: str) -> str:
    if not value:
        return value

    return f"{value[0].upper()}{value[1:]}"


def palette_image_name(category: str, folder: str) -> str:
    return folder if category == "other" else f"{category}{to_pascal_case(folder)}"


def find_palette_dirs(root: Path) -> list[tuple[str, str, Path]]:
    palette_dirs: list[tuple[str, str, Path]] = []

    for category_dir in root.iterdir():
        if not category_dir.is_dir() or category_dir.name.startswith("."):
            continue

        # Legacy flat structure support: palettes/<name>/src/options.ts
        if (category_dir / "src" / "options.ts").exists():
            palette_dirs.append(("other", category_dir.name, category_dir))
            continue

        for palette_dir in category_dir.iterdir():
            if not palette_dir.is_dir() or palette_dir.name.startswith("."):
                continue

            if not (palette_dir / "package.json").exists():
                continue

            if not (palette_dir / "src" / "options.ts").exists():
                continue

            palette_dirs.append((category_dir.name, palette_dir.name, palette_dir))

    return sorted(palette_dirs, key=lambda item: (item[0], item[1]))


def find_preset_dirs(root: Path) -> list[tuple[str, Path]]:
    preset_dirs: list[tuple[str, Path]] = []

    for preset_dir in root.iterdir():
        if not preset_dir.is_dir() or preset_dir.name.startswith("."):
            continue

        if not (preset_dir / "package.json").exists():
            continue

        preset_dirs.append((preset_dir.name, preset_dir))

    return sorted(preset_dirs, key=lambda item: item[0])


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Sync preset and palette screenshots between package samples and demo images."
    )
    parser.add_argument(
        "--from",
        choices=[SYNC_FROM_SAMPLES, SYNC_FROM_DEMO],
        default=SYNC_FROM_SAMPLES,
        dest="source",
        help=(
            "Sync direction: 'samples' copies package images/sample.png to demo/vanilla/public/images/* (default); "
            "'demo' copies demo images back to package sample files."
        ),
    )
    parser.add_argument(
        "--only",
        choices=["all", "palettes", "presets"],
        default="all",
        help="Limit synchronization to palettes, presets, or both.",
    )
    parser.add_argument(
        "--strict",
        action="store_true",
        help="Exit with code 1 if one or more source images are missing.",
    )

    return parser.parse_args()


def sync_palettes(source: str) -> tuple[int, int, list[str]]:
    palette_dirs = find_palette_dirs(PALETTES_ROOT)
    updated = 0
    missing: list[str] = []

    for category, folder, palette_dir in palette_dirs:
        image_id = palette_image_name(category, folder)

        if source == SYNC_FROM_SAMPLES:
            source_image = palette_dir / "images" / "sample.png"
            target_image = PALETTE_DEMO_IMAGES / f"{image_id}.png"
        else:
            source_image = PALETTE_DEMO_IMAGES / f"{image_id}.png"
            target_image = palette_dir / "images" / "sample.png"

        if not source_image.exists():
            missing.append(f"palettes/{category}/{folder} -> {image_id}.png")
            continue

        target_image.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(source_image, target_image)
        updated += 1

    return len(palette_dirs), updated, missing


def sync_presets(source: str) -> tuple[int, int, list[str]]:
    preset_dirs = find_preset_dirs(PRESETS_ROOT)
    updated = 0
    missing: list[str] = []

    for folder, preset_dir in preset_dirs:
        if source == SYNC_FROM_SAMPLES:
            source_image = preset_dir / "images" / "sample.png"
            target_image = PRESET_DEMO_IMAGES / f"{folder}.png"
        else:
            source_image = PRESET_DEMO_IMAGES / f"{folder}.png"
            target_image = preset_dir / "images" / "sample.png"

        if not source_image.exists():
            missing.append(f"presets/{folder} -> {folder}.png")
            continue

        target_image.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(source_image, target_image)
        updated += 1

    return len(preset_dirs), updated, missing


def main() -> int:
    args = parse_args()
    direction_target = "demo" if args.source == SYNC_FROM_SAMPLES else "samples"

    print(f"Direction: {args.source} -> {direction_target}")
    print(f"Scope: {args.only}")

    missing_all: list[str] = []

    if args.only in ("all", "palettes"):
        found, updated, missing = sync_palettes(args.source)
        missing_all.extend(missing)
        print(f"Palette packages found: {found}")
        print(f"Palette images updated: {updated}")
        print(f"Palette images missing: {len(missing)}")

    if args.only in ("all", "presets"):
        found, updated, missing = sync_presets(args.source)
        missing_all.extend(missing)
        print(f"Preset packages found: {found}")
        print(f"Preset images updated: {updated}")
        print(f"Preset images missing: {len(missing)}")

    if missing_all:
        print("Missing:")
        for item in sorted(missing_all):
            print(f"- {item}")

    if args.strict and missing_all:
        return 1

    return 0


if __name__ == "__main__":
    sys.exit(main())
