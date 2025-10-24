﻿import React from 'react';
import { Card, CardContent } from '../ui/Card';

const SocialLinksManager: React.FC = () => {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold text-neon-red mb-4">Social Links Management</h2>
        <p className="text-muted-foreground">Manage your social media links - YouTube, Email, etc.</p>
      </CardContent>
    </Card>
  );
};

export default SocialLinksManager;
