import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

const UserProfile: React.FC = () => {
  const [joinedCount, setJoinedCount] = useState(
    () => Math.floor(Math.random() * (25 - 4 + 1)) + 4,
  );

  useEffect(() => {
    // Правдоподобно надеюсь
    const interval = setInterval(() => {
      setJoinedCount((prev) => prev + 1);
    }, 60000);

    return () => clearInterval(interval);
  }, []);
  return (
    <Card className="backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl">
      <CardHeader className="text-center pb-6">
        <CardTitle className="text-2xl font-bold text-white flex items-center justify-center gap-2">
          <Icon name="UserPlus" size={24} />
          Вас приглашает:
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-6">
        <div className="w-20 h-20 rounded-full mx-auto overflow-hidden border-4 border-gradient-to-r from-primary to-secondary shadow-lg">
          <img
            src="/img/bac989fa-d0e3-47a7-b208-af1093f06634.jpg"
            alt="Александр Сергеевич Великих"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-white">
            Александр Сергеевич Великих
          </h3>
          <p className="text-white/70">
            Начальник отдела технического оснащения и телекоммуникаций
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-white/60">
            <Icon name="Building" size={16} />
            <span>ГБУЗ "МИАЦ"</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 pt-4">
          <div className="text-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
              6
            </div>
            <div className="text-sm text-white/60">Чатов</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent transition-all duration-500 ease-out">
              {joinedCount}
            </div>
            <div className="text-sm text-white/60">Уже присоединились</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfile;