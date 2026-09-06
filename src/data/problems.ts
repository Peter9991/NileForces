import { type Problem } from "../types";

export const mockProblems: Problem[] = [
  { id: 1, title: "Two Sum", difficulty: "Easy",
    statement: "Given an array of integers, return indices of the two numbers that add up to a target.",
    sample_input: "4\n2 7 11 15\n9", sample_output: "0 1" },
  { id: 2, title: "Binary Search", difficulty: "Easy",
    statement: "Implement binary search on a sorted array.",
    sample_input: "5\n1 3 5 7 9\n5", sample_output: "2" },
  { id: 3, title: "Longest Increasing Subsequence", difficulty: "Medium",
    statement: "Find the length of the longest strictly increasing subsequence.",
    sample_input: "6\n10 9 2 5 3 7", sample_output: "3" },
];