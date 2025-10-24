import React from 'react';
import { Card, CardContent } from '../ui/Card';

const SkillsManager: React.FC = () => {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold text-neon-red mb-4">Skills Management</h2>
        <p className="text-muted-foreground">Skills management component - Add your skills here.</p>
      </CardContent>
    </Card>
  );
};

export default SkillsManager;
