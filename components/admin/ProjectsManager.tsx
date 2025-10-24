import React from 'react';
import { Card, CardContent } from '../ui/Card';

const ProjectsManager: React.FC = () => {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold text-neon-red mb-4">Projects Management</h2>
        <p className="text-muted-foreground">Projects management component - Manage your portfolio here.</p>
      </CardContent>
    </Card>
  );
};

export default ProjectsManager;
