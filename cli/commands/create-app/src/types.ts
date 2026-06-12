export interface TemplateInfo {
  displayName: string;
  frameworks: string[];
  name: string;
  type: "scaffold" | "example";
}

export interface UserOptions {
  destination: string;
  framework: string;
  projectName: string;
  skipInstall: boolean;
  template?: string;
}

export interface ScaffoldResult {
  frameworkUsed: string;
  targetDir: string;
  templateUsed: string;
}
