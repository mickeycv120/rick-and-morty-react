import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'

export const characterCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Character Name</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>Character Description</CardDescription>
      </CardContent>
    </Card>
  );
};
