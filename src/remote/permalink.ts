import * as vscode from 'vscode';
import { dirname } from 'path';
import { Repository } from '../remote/repository';

export class Permalink {
	private repository: Repository;

	constructor(private editor: vscode.TextEditor) {
		this.repository = new Repository(dirname(this.editor.document.fileName));
	}

	async get(branch: string): Promise<string> {
		const { domain, owner, name } = await this.repository.config();
		const { sha } = await this.repository.shaMaster(branch);

		const start = this.editor.selection.start.line + 1;
		const end = this.editor.selection.end.line + 1;

		const file = vscode.workspace.asRelativePath(this.editor.document.uri);

		return `https://${domain}/${owner}/${name}/blob/${sha}/${file}#L${start}-L${end}`;
	}
}