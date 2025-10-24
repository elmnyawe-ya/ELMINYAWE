﻿import React from 'react';
import { Card, CardContent } from '../ui/Card';

const SiteSettingsManager: React.FC = () => {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold text-neon-red mb-4">Site Settings</h2>
        <p className="text-muted-foreground">Global site settings - Edit hero section, site title, etc.</p>
      </CardContent>
    </Card>
  );
};

export default SiteSettingsManager;
