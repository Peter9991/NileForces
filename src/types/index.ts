export interface Problem {
  id: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  timelimit: number;
  memorylimit: number;
  statement: string;
  sample_input: string;
  sample_output: string;
}
export interface Testcase {
    id: number;
    problemid: number;
    input: string;
    output:string;
}