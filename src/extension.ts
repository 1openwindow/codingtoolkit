import * as vscode from "vscode";
import * as handler from "./commands/handler";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(vscode.commands.registerCommand("codingtoolkit.copyPermalink", async () => {
    handler.copyPermalink();
  }));
}

export function deactivate() { }
