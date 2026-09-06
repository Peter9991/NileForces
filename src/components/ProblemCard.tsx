import { type Problem } from "../types";

interface ProblemCardProps {
  problem: Problem;
}

export default function ProblemCard({ problem }: ProblemCardProps) {

  const getDifficultyStyles = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return { bg: '#dcfce7', text: '#166534' };
      case 'medium': return { bg: '#fef08a', text: '#854d0e' };
      case 'hard': return { bg: '#fee2e2', text: '#991b1b' };
      default: return { bg: '#f3f4f6', text: '#374151' };
    }
  };

  const badgeColors = getDifficultyStyles(problem.difficulty);

  return (
    <div style={{ 
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      border: '1px solid #eaeaea', 
      borderRadius: '12px',
      padding: '16px 20px', 
      margin: '12px 0',
      backgroundColor: '#ffffff',
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#111827', fontWeight: 600 }}>
        {problem.title}
      </h3>
      <span style={{ 
        backgroundColor: badgeColors.bg,
        color: badgeColors.text,
        padding: '4px 12px',
        borderRadius: '999px',
        fontSize: '0.85rem',
        fontWeight: 600,
        textTransform: 'capitalize'
      }}>
        {problem.difficulty}
      </span>
    </div>
  );
}