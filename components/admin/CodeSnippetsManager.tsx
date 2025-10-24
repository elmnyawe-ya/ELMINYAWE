import React from 'react';
import { Card, CardContent } from '../ui/Card';

const CodeSnippetsManager: React.FC = () => {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold text-neon-red mb-4">Code Snippets Management</h2>
        <p className="text-muted-foreground">Approve and manage user-submitted code snippets.</p>
      </CardContent>
    </Card>
  );
};

export default CodeSnippetsManager;
