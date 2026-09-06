export interface Problem {
  id: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  statement: string;
  sample_input: string;
  sample_output: string;
}