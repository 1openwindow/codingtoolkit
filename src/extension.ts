import * as vscode from "vscode";
import * as handler from "./commands/handler"

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(vscode.commands.registerCommand("codingtoolkit.copyPermalink", async () => {
    handler.copyPermalink();
  }));
}

// this method is called when your extension is deactivated
export function deactivate() { }
