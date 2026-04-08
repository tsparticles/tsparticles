#!/usr/bin/env python3
import argparse
import sys
from pathlib import Path
import shutil

ROOT = Path(__file__).resolve().parents[1]
PALETTES_ROOT = ROOT / "palettes"
DEMO_IMAGES = ROOT / "apps" / "demo" / "public" / "images" / "palettes"

SYNC_FROM_SAMPLES = "samples"
SYNC_FROM_DEMO = "demo"

def find_palette_dirs(root: Path) -> list[Path]:
    palette_dirs: list[Path] = []

    for candidate in root.glob("*/*"):
        if not candidate.is_dir():
            continue

        if not (candidate / "package.json").exists():
            continue

        # A valid palette package always contains options definition.
        if not (candidate / "src" / "options.ts").exists():
            continue

        palette_dirs.append(candidate)

    return sorted(palette_dirs)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Sync palette screenshots between package sample.png files and demo images."
    )
    parser.add_argument(
        "--from",
        choices=[SYNC_FROM_SAMPLES, SYNC_FROM_DEMO],
        default=SYNC_FROM_SAMPLES,
        dest="source",
        help=(
            "Sync direction: 'samples' copies palettes/*/*/images/sample.png to apps/demo/public/images/palettes/*.png "
            "(default); 'demo' copies demo images back to package sample files."
        ),
    )
    parser.add_argument(
        "--strict",
        action="store_true",
        help="Exit with code 1 if one or more source images are missing.",
    )

    return parser.parse_args()


args = parse_args()
palette_dirs = find_palette_dirs(PALETTES_ROOT)

updated = 0
missing_demo_images = []

for palette_dir in palette_dirs:
    folder_name = palette_dir.name

    if args.source == SYNC_FROM_SAMPLES:
      source_image = palette_dir / "images" / "sample.png"
      target_image = DEMO_IMAGES / f"{folder_name}.png"
    else:
      source_image = DEMO_IMAGES / f"{folder_name}.png"
      target_image = palette_dir / "images" / "sample.png"

    if not source_image.exists():
        missing_demo_images.append(folder_name)
        continue

    target_image.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(source_image, target_image)
    updated += 1

print(f"Palette packages found: {len(palette_dirs)}")
print(f"Direction: {args.source} -> {'demo' if args.source == SYNC_FROM_SAMPLES else 'samples'}")
print(f"Updated sample images: {updated}")
print(f"Missing demo images: {len(missing_demo_images)}")

if missing_demo_images:
    print("Missing:")
    for name in sorted(missing_demo_images):
        print(f"- {name}")

if args.strict and missing_demo_images:
    sys.exit(1)

