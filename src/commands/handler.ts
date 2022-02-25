import * as vscode from "vscode";
import { Permalink } from "../remote/permalink";
import { SchemeType, BRANCH_NAME} from "../utils/constant";
import * as path from "path";
import { Repository } from "../remote/repository";

export async function copyPermalink(): Promise<void> {
  const editor = vscode.window.activeTextEditor;

  if (editor && editor.document.uri.scheme === SchemeType.file) {
    const permalink = new Permalink(editor);

    try {
      const url = await permalink.getPermalink(BRANCH_NAME);

      vscode.env.clipboard.writeText(url);
      vscode.window.showInformationMessage(`Copied permalink ${url} from ${BRANCH_NAME}.`);
    } catch (error) {
      let errorMessage: string = "Failed to copy permalink";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      vscode.window.showWarningMessage(errorMessage);
    }
  }
}

export async function goToRemoteRepo() {
  const editor = vscode.window.activeTextEditor;
  
  if (editor && editor.document.uri.scheme === SchemeType.file) {
    const repository: Repository = new Repository(path.dirname(editor.document.fileName));

    try {
      const url = await repository.remoteUri();
      vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(url));
    } catch (error) {
      let errorMessage: string = "Failed to open remote repo";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      vscode.window.showWarningMessage(errorMessage);
    }
  }
}

export async function goToRemoteFile() {
  const editor = vscode.window.activeTextEditor;
  
  if (editor && editor.document.uri.scheme === SchemeType.file) {
    const permalink: Permalink = new Permalink(editor);

    try {
      const url = await permalink.getRemoteFile(BRANCH_NAME);
      vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(url));
    } catch (error) {
      let errorMessage: string = "Failed to open remote file";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      vscode.window.showWarningMessage(errorMessage);
    }
  }
}

