import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const UserProfile: React.FC = () => {
  // Генерируем случайное начальное число от 4 до 25
  const [joinedCount, setJoinedCount] = useState(() => 
    Math.floor(Math.random() * (25 - 4 + 1)) + 4
  );

  useEffect(() => {
    // Увеличиваем счетчик каждую минуту (60000 мс)
    const interval = setInterval(() => {
      setJoinedCount(prev => prev + 1);
    }, 60000);

    return () => clearInterval(interval);
  }, []);
  return (
    <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
      <CardHeader className="text-center pb-6">
        <CardTitle className="text-2xl font-bold text-foreground flex items-center justify-center gap-2">
          <Icon name="UserPlus" size={24} />
          Вас приглашает:
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-6">
        <div className="w-20 h-20 rounded-full mx-auto overflow-hidden border-4 border-gradient-to-r from-primary to-secondary shadow-lg">
          <img 
            src="https://cdn.poehali.dev/files/e90976e3-e616-4f18-bef2-14de513d71e4.jpeg" 
            alt="Александр Сергеевич Великих"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-foreground">Александр Сергеевич Великих</h3>
          <p className="text-muted-foreground">Начальник отдела технического оснащения и телекоммуникаций</p>
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
            <div className="text-2xl font-bold text-secondary transition-all duration-500 ease-out">
              {joinedCount}
            </div>
            <div className="text-sm text-muted-foreground">Уже присоединились</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfile;