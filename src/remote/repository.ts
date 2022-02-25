import * as childProcess from "child_process";
import * as vscode from "vscode";

export class Repository {
  constructor(private path: string) { }

  async config(): Promise<{ domain: string, owner: string, name: string }> {
    const git = childProcess.execSync(`cd ${this.path} && git config --get remote.origin.url`);
    const config = git.toString();

    return this.parseConfig(config);
  }

  async shaMaster(branch: string): Promise<string> {
    const git = childProcess.execSync(`cd ${this.path} && git rev-parse ${branch}`);
    const sha = git.toString();

    return sha.trim();
  }

  async rootUri(): Promise<string> {
    const git = childProcess.execSync(`cd ${this.path} && git rev-parse --show-toplevel`);
    const rootUri = git.toString();

    return rootUri.trim();;
  }

  async remoteUri(): Promise<string> {
    const { domain, owner, name } = await this.config();
    return `https://${domain}/${owner}/${name}`;
  }

  private parseConfig(output: string): { domain: string, owner: string, name: string } {
    const normalizedOutput = output.replace(/(\s+|git@|http(s)?:\/\/|\.git)/g, '').replace(':', '/');
    let domain, owner, name;

    if (normalizedOutput) {
      [domain, owner, name] = normalizedOutput.split('/');
    } else {
      throw Error('Could not get Git info, please try a little later');
    }

    return { domain, owner, name };
  }
}