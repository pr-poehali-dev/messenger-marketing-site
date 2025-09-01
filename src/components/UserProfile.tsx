import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const UserProfile: React.FC = () => {
  return (
    <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
      <CardHeader className="text-center pb-6">
        <CardTitle className="text-2xl font-bold text-foreground flex items-center justify-center gap-2">
          <Icon name="User" size={24} />
          Профиль сотрудника
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-6">
        <div className="w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto flex items-center justify-center">
          <Icon name="User" size={32} className="text-white" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-foreground">Анна Владимировна Петрова</h3>
          <p className="text-muted-foreground">Старший менеджер по продажам</p>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Icon name="Building" size={16} />
            <span>ГБУЗ "МИАЦ"</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 pt-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">6</div>
            <div className="text-sm text-muted-foreground">Чатов</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-secondary">12</div>
            <div className="text-sm text-muted-foreground">Уже присоединились</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfile;