import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

interface LoginData {
  login: string;
  password: string;
}

interface LoginFormProps {
  loginData: LoginData;
  setLoginData: (data: LoginData) => void;
  handleLogin: () => void;
  isLoading: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ 
  loginData, 
  setLoginData, 
  handleLogin, 
  isLoading 
}) => {
  return (
    <Card className="backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl">
      <CardHeader className="text-center pb-6">
        <CardTitle className="text-2xl font-bold text-white flex items-center justify-center gap-2">
          <Icon name="LogIn" size={24} />
          Вход в систему
        </CardTitle>
        <div className="relative group">
          <div className="flex items-center justify-center gap-2 mt-3 text-sm text-white/90 bg-white/10 px-4 py-2 rounded-lg cursor-help backdrop-blur-sm border border-white/20">
            <Icon name="Info" size={16} className="text-blue-400" />
            <span>Используйте учетную запись Windows Active Directory</span>
          </div>
          
          {/* Tooltip с картинкой */}
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
            <div className="bg-white rounded-lg shadow-2xl border-2 border-gray-200 p-3">
              <img 
                src="https://cdn.poehali.dev/files/da328068-3f35-4c92-bcec-98d4b394434b.png"
                alt="Windows входное окно"
                className="w-80 h-auto rounded-lg"
              />
              <div className="mt-2 text-xs text-gray-600 text-center">
                Пример входа через Windows AD
              </div>
              {/* Стрелка тултипа */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white"></div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="login" className="text-white/90 font-bold">Логин</Label>
          <Input
            id="login"
            type="text"
            placeholder="Введите ваш логин"
            value={loginData.login}
            onChange={(e) => setLoginData({ ...loginData, login: e.target.value })}
            className="h-12 bg-white/10 border-2 border-white/30 focus:border-primary text-white placeholder:text-white/50 backdrop-blur-sm"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password" className="text-white/90 font-bold">Пароль</Label>
          <Input
            id="password"
            type="password"
            placeholder="Введите ваш пароль"
            value={loginData.password}
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            className="h-12 bg-white/10 border-2 border-white/30 focus:border-primary text-white placeholder:text-white/50 backdrop-blur-sm"
          />
        </div>
        <Button 
          className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity disabled:opacity-50"
          onClick={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Проверяем данные...</span>
            </div>
          ) : (
            'Войти'
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default LoginForm;