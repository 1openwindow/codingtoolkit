import * as vscode from "vscode";
import * as handler from "./commands/handler";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(vscode.commands.registerCommand("codingtoolkit.copyPermalink", async () => {
    handler.copyPermalink();
  }));

  context.subscriptions.push(vscode.commands.registerCommand("codingtoolkit.goToRemoteRepo", async () => {
    handler.goToRemoteRepo();
  }));

  context.subscriptions.push(vscode.commands.registerCommand("codingtoolkit.goToRemoteFile", async () => {
    handler.goToRemoteFile();
  }));
}

export function deactivate() { }
