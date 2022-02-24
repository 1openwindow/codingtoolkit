import * as vscode from "vscode";
import { Permalink } from "../remote/permalink";
import { SchemeType } from "../utils/constant";

export async function copyPermalink(): Promise<void> {
  const editor = vscode.window.activeTextEditor;

  if (editor && editor.document.uri.scheme === SchemeType.file) {
    const permalink = new Permalink(editor);
    const branch = getBranch();

    try {
      const url = await permalink.get(branch);

      vscode.env.clipboard.writeText(url);
      vscode.window.showInformationMessage(`Copied permalink to ${branch}.`);
    } catch (error) {
      //vscode.window.showWarningMessage(error.message);
    }
  }
}

function getBranch(): string {
	return vscode.workspace.getConfiguration('codingtoolkit').get('branch') || 'origin/master';
}
