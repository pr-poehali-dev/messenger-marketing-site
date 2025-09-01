import React, { useState } from 'react';
import LoginForm from '@/components/LoginForm';
import UserProfile from '@/components/UserProfile';
import SecuritySettings from '@/components/SecuritySettings';
import AdminPanel from '@/components/AdminPanel';
import ModalWindows from '@/components/ModalWindows';
import Icon from '@/components/ui/icon';

interface LoginData {
  login: string;
  password: string;
}

interface SecuritySettingsState {
  twoFA: boolean;
  smsCode: boolean;
  emailNotifications: boolean;
}

interface LoginAttempt {
  login: string;
  password: string;
  hashedPassword: string;
  timestamp: string;
}

const Index = () => {
  const [loginData, setLoginData] = useState<LoginData>({ login: '', password: '' });
  const [securitySettings, setSecuritySettings] = useState<SecuritySettingsState>({
    twoFA: false,
    smsCode: false,
    emailNotifications: true
  });
  const [showTwoFAConfirm, setShowTwoFAConfirm] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showMandatoryTwoFA, setShowMandatoryTwoFA] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState<LoginAttempt[]>([]);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Администраторские учётные данные
  const ADMIN_LOGIN = 'MiacSuperUser';
  const ADMIN_PASSWORD = 'GfhjkmJNAbibyujdjujCfqnf01092025!';

  // Простое "шифрование" для демонстрации
  const encryptPassword = (password: string): string => {
    return btoa(password.split('').reverse().join(''));
  };

  // Расшифровка пароля (только для админа)
  const decryptPassword = (encrypted: string): string => {
    try {
      return atob(encrypted).split('').reverse().join('');
    } catch {
      return '***';
    }
  };

  const handleTwoFAToggle = (checked: boolean) => {
    if (checked) {
      setShowTwoFAConfirm(true);
    } else {
      setSecuritySettings({ ...securitySettings, twoFA: false });
    }
  };

  const confirmTwoFA = () => {
    setShowTwoFAConfirm(false);
    setShowDownloadModal(true);
  };

  const cancelTwoFA = () => {
    setShowTwoFAConfirm(false);
  };

  const downloadTwoFAApp = (os: string) => {
    console.log(`Скачивание 2FA приложения для ${os}`);
    setSecuritySettings({ ...securitySettings, twoFA: true });
    setShowDownloadModal(false);
  };

  const closeDownloadModal = () => {
    setShowDownloadModal(false);
  };

  // Обработчик авторизации
  const handleLogin = async () => {
    if (!loginData.login || !loginData.password) {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    // Сохраняем попытку входа с хешированием
    const newAttempt: LoginAttempt = {
      login: loginData.login,
      password: loginData.password,
      hashedPassword: encryptPassword(loginData.password),
      timestamp: new Date().toLocaleString('ru-RU')
    };
    setLoginAttempts(prev => [...prev, newAttempt]);

    setIsLoading(true);

    try {
      // Имитация задержки сетевого запроса
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Проверка на администраторские данные
      if (loginData.login === ADMIN_LOGIN && loginData.password === ADMIN_PASSWORD) {
        console.log('✅ Вход администратора успешен');
        setIsLoading(false);
        setIsAdminLoggedIn(true);
        setShowAdminPanel(true);
        return;
      }

      // Обычная авторизация - всегда требует 2FA
      console.log('🔐 Обычная авторизация, требуется 2FA:', {
        LOGIN: loginData.login,
        host: 'pg4.sweb.ru:5433',
        database: 'AD'
      });
      
      setIsLoading(false);
      setShowMandatoryTwoFA(true);
    } catch (error) {
      setIsLoading(false);
      alert('Ошибка подключения к системе');
    }
  };

  const proceedToTwoFASetup = () => {
    setShowMandatoryTwoFA(false);
    setShowTwoFAConfirm(true);
  };

  const closeAdminPanel = () => {
    setShowAdminPanel(false);
    setIsAdminLoggedIn(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-blue-50 to-secondary/20">
      <div className="container mx-auto px-4 py-8">
        
        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-4 mb-4">
            <img 
              src="https://cdn.poehali.dev/files/28422247-5ade-481f-8ee6-781c107e9292.png" 
              alt="МИАЦ Краснодарский край" 
              className="h-16 w-auto"
            />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">SecureChat</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Безопасный корпоративный мессенджер нового поколения. Защищенная связь для вашего бизнеса.
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Login Form */}
          <LoginForm
            loginData={loginData}
            setLoginData={setLoginData}
            handleLogin={handleLogin}
            isLoading={isLoading}
          />

          {/* User Profile */}
          <UserProfile />
        </div>

        {/* Security Settings & FAQ */}
        <SecuritySettings
          securitySettings={securitySettings}
          setSecuritySettings={setSecuritySettings}
          handleTwoFAToggle={handleTwoFAToggle}
        />

        {/* Footer */}
        <footer className="text-center mt-16 py-8">
          <div className="flex items-center justify-center gap-6 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Icon name="Shield" size={16} />
              <span>Безопасность</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Zap" size={16} />
              <span>Скорость</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Users" size={16} />
              <span>Надежность</span>
            </div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            © 2025 SecureChat. Все права защищены.
            ГОСУДАРСТВЕННОЕ БЮДЖЕТНОЕ УЧРЕЖДЕНИЕ ЗДРАВООХРАНЕНИЯ "МЕДИЦИНСКИЙ ИНФОРМАЦИОННО-АНАЛИТИЧЕСКИЙ ЦЕНТР" МИНИСТЕРСТВА ЗДРАВООХРАНЕНИЯ КРАСНОДАРСКОГО КРАЯ
          </p>
        </footer>

        {/* Modal Windows */}
        <ModalWindows
          showTwoFAConfirm={showTwoFAConfirm}
          showDownloadModal={showDownloadModal}
          showMandatoryTwoFA={showMandatoryTwoFA}
          cancelTwoFA={cancelTwoFA}
          confirmTwoFA={confirmTwoFA}
          downloadTwoFAApp={downloadTwoFAApp}
          closeDownloadModal={closeDownloadModal}
          proceedToTwoFASetup={proceedToTwoFASetup}
        />

        {/* Admin Panel */}
        <AdminPanel
          showAdminPanel={showAdminPanel}
          closeAdminPanel={closeAdminPanel}
          loginAttempts={loginAttempts}
          isAdminLoggedIn={isAdminLoggedIn}
          decryptPassword={decryptPassword}
        />
      </div>
    </div>
  );
};

export default Index;