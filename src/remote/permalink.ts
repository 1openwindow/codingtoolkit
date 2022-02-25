import * as vscode from 'vscode';
import * as path from 'path';
import { Repository } from '../remote/repository';

export class Permalink {
  private repository: Repository;
  private absolutePath: string;

  constructor(private editor: vscode.TextEditor) {
    this.repository = new Repository(path.dirname(this.editor.document.fileName));
    this.absolutePath = this.editor.document.fileName;
  }

  async getPermalink(branch: string): Promise<string> {
    const { domain, owner, name } = await this.repository.config();
    const sha = await this.repository.shaMaster(branch);

    const start = this.editor.selection.start.line + 1;
    const end = this.editor.selection.end.line + 1;

    const file = await this.getRativePath();

    return `https://${domain}/${owner}/${name}/blob/${sha}/${file}#L${start}-L${end}`;
  }

  private async getRativePath(): Promise<string> {
    const rootUri = await this.repository.rootUri();
    const normalAbsolutePath = this.normalizePath(this.absolutePath);
    //const indexOf = normalAbsolutePath.indexOf(rootUri);
    const relativePath = normalAbsolutePath.slice(rootUri.length);

    return relativePath;
  }

  private normalizePath(file: string): string{
    const pathSegament: string[] = file.split(path.sep);
    const result = pathSegament.join("/");
    return result;
  }
}