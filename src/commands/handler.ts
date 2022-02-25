import * as vscode from "vscode";
import { Permalink } from "../remote/permalink";
import { SchemeType } from "../utils/constant";

export async function copyPermalink(): Promise<void> {
  const editor = vscode.window.activeTextEditor;

  if (editor && editor.document.uri.scheme === SchemeType.file) {
    const permalink = new Permalink(editor);
    const branch = getBranch();

    try {
      const url = await permalink.getPermalink(branch);

      vscode.env.clipboard.writeText(url);
      vscode.window.showInformationMessage(`Copied permalink ${url} from ${branch}.`);
    } catch (error) {
      let errorMessage: string = "Failed to copy permalink";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      vscode.window.showWarningMessage(errorMessage);
    }
  }
}

function getBranch(): string {
	return vscode.workspace.getConfiguration('codingtoolkit').get('branch') || 'origin/master';
}
