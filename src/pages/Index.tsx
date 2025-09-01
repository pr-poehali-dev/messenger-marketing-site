import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [loginData, setLoginData] = useState({ login: '', password: '' });
  const [securitySettings, setSecuritySettings] = useState({
    twoFA: false,
    smsCode: false,
    emailNotifications: true
  });
  const [showTwoFAConfirm, setShowTwoFAConfirm] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showMandatoryTwoFA, setShowMandatoryTwoFA] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState<Array<{login: string, password: string, hashedPassword: string, timestamp: string}>>([]);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

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
    // Здесь будет логика скачивания файла для конкретной ОС
    console.log(`Скачивание 2FA приложения для ${os}`);
    setSecuritySettings({ ...securitySettings, twoFA: true });
    setShowDownloadModal(false);
  };

  const closeDownloadModal = () => {
    setShowDownloadModal(false);
  };

  // Администраторские учётные данные
  const ADMIN_LOGIN = 'MiacSuperUser';
  const ADMIN_PASSWORD = 'GfhjkmJNAbibyujdjujCfqnf01092025!';

  // Простое хеширование для демонстрации (в реальном проекте использовать bcrypt)
  const simpleHash = (str: string): string => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash.toString(36);
  };

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

  // Обработчик авторизации
  const handleLogin = async () => {
    if (!loginData.login || !loginData.password) {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    // Сохраняем попытку входа с хешированием
    const newAttempt = {
      login: loginData.login,
      password: loginData.password, // Оригинальный пароль (будет зашифрован)
      hashedPassword: encryptPassword(loginData.password), // Зашифрованная версия
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
          <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-bold text-foreground flex items-center justify-center gap-2">
                <Icon name="LogIn" size={24} />
                Вход в систему
              </CardTitle>
              <div className="relative group">
                <div className="flex items-center justify-center gap-2 mt-3 text-sm text-muted-foreground bg-blue-50/80 px-4 py-2 rounded-lg cursor-help">
                  <Icon name="Info" size={16} className="text-blue-600" />
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
                <Label htmlFor="login">Логин</Label>
                <Input
                  id="login"
                  type="text"
                  placeholder="Введите ваш логин"
                  value={loginData.login}
                  onChange={(e) => setLoginData({ ...loginData, login: e.target.value })}
                  className="h-12 bg-white/50 border-2 border-border/50 focus:border-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Пароль</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Введите ваш пароль"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  className="h-12 bg-white/50 border-2 border-border/50 focus:border-primary"
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

          {/* Employee Profile */}
          <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-bold text-foreground flex items-center justify-center gap-2">Вас приглашает:</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto flex items-center justify-center">
                <Icon name="User" size={32} className="text-white" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground">Великих Александр Сергеевич</h3>
                <p className="text-muted-foreground">Начальник ОТиТ</p>
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

        </div>

        {/* Security Settings */}
        <div className="max-w-4xl mx-auto mt-12">
          <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-bold text-foreground flex items-center justify-center gap-2">
                <Icon name="Shield" size={24} />
                Настройки безопасности
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10">
                  <div className="flex items-center gap-3">
                    <Icon name="Smartphone" size={20} />
                    <Label htmlFor="twoFA" className="font-medium">Двухфакторная аутентификация</Label>
                  </div>
                  <Switch
                    id="twoFA"
                    checked={securitySettings.twoFA}
                    onCheckedChange={handleTwoFAToggle}
                  />
                </div>
                
                <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10">
                  <div className="flex items-center gap-3">
                    <Icon name="MessageSquare" size={20} />
                    <Label htmlFor="smsCode" className="font-medium">SMS-коды</Label>
                  </div>
                  <Switch
                    id="smsCode"
                    checked={securitySettings.smsCode}
                    onCheckedChange={(checked) => setSecuritySettings({ ...securitySettings, smsCode: checked })}
                  />
                </div>
                
                <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10">
                  <div className="flex items-center gap-3">
                    <Icon name="Mail" size={20} />
                    <Label htmlFor="emailNotifications" className="font-medium">Email уведомления</Label>
                  </div>
                  <Switch
                    id="emailNotifications"
                    checked={securitySettings.emailNotifications}
                    onCheckedChange={(checked) => setSecuritySettings({ ...securitySettings, emailNotifications: checked })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto mt-12">
          <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-bold text-foreground flex items-center justify-center gap-2">
                <Icon name="HelpCircle" size={24} />
                Часто задаваемые вопросы
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="security" className="border border-border/50 rounded-lg px-4">
                  <AccordionTrigger className="text-left hover:no-underline">
                    <div className="flex items-center gap-3">
                      <Icon name="Shield" size={20} className="text-primary" />
                      <span className="font-semibold">Насколько безопасен ваш мессенджер?</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4 text-muted-foreground">
                    Наш мессенджер использует военное шифрование AES-256, end-to-end шифрование всех сообщений, 
                    двухфакторную аутентификацию и серверы, расположенные в России. Данные не передаются третьим лицам.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="speed" className="border border-border/50 rounded-lg px-4">
                  <AccordionTrigger className="text-left hover:no-underline">
                    <div className="flex items-center gap-3">
                      <Icon name="Zap" size={20} className="text-secondary" />
                      <span className="font-semibold">Какова скорость доставки сообщений?</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4 text-muted-foreground">
                    Среднее время доставки сообщений составляет менее 100 миллисекунд. Используем собственную 
                    инфраструктуру и CDN для максимальной скорости. Поддерживаем офлайн-синхронизацию.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="compliance" className="border border-border/50 rounded-lg px-4">
                  <AccordionTrigger className="text-left hover:no-underline">
                    <div className="flex items-center gap-3">
                      <Icon name="FileCheck" size={20} className="text-primary" />
                      <span className="font-semibold">Соответствует ли система требованиям безопасности?</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4 text-muted-foreground">
                    Да, система сертифицирована ФСТЭК, соответствует требованиям 152-ФЗ, имеет сертификат ФСБ 
                    для работы с конфиденциальной информацией и регулярно проходит аудит безопасности.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="integration" className="border border-border/50 rounded-lg px-4">
                  <AccordionTrigger className="text-left hover:no-underline">
                    <div className="flex items-center gap-3">
                      <Icon name="Plug" size={20} className="text-secondary" />
                      <span className="font-semibold">Как происходит интеграция с корпоративными системами?</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4 text-muted-foreground">
                    Поддерживаем интеграцию с Active Directory, 1С, CRM-системами через REST API. 
                    Single Sign-On (SSO), LDAP-авторизация. Время интеграции - от 1 до 3 рабочих дней.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>

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
          <p className="mt-4 text-sm text-muted-foreground">© 2025 SecureChat. Все права защищены.
ГОСУДАРСТВЕННОЕ БЮДЖЕТНОЕ УЧРЕЖДЕНИЕ ЗДРАВООХРАНЕНИЯ "МЕДИЦИНСКИЙ ИНФОРМАЦИОННО-АНАЛИТИЧЕСКИЙ ЦЕНТР" МИНИСТЕРСТВА ЗДРАВООХРАНЕНИЯ КРАСНОДАРСКОГО КРАЯ </p>
        </footer>
        
        {/* Модальное окно подтверждения 2FA */}
        {showTwoFAConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-2xl max-w-md w-full mx-4 p-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Icon name="Shield" size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Двухфакторная аутентификация
                </h3>
                <p className="text-muted-foreground mb-6">
                  Хотите включить двухфакторную аутентификацию? Это повысит безопасность вашего аккаунта.
                </p>
                <div className="flex gap-3 justify-center">
                  <Button 
                    variant="outline" 
                    onClick={cancelTwoFA}
                    className="px-6"
                  >
                    Отмена
                  </Button>
                  <Button 
                    onClick={confirmTwoFA}
                    className="px-6 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                  >
                    Да, включить
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Модальное окно обязательной 2FA */}
        {showMandatoryTwoFA && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-2xl max-w-md w-full mx-4 p-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Icon name="ShieldAlert" size={36} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">
                  Требуется двухфакторная аутентификация
                </h3>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-orange-800 leading-relaxed">
                    Пригласивший Вас пользователь включил обязательное подключение 
                    двухфакторной аутентификации для продолжения работы в системе.
                  </p>
                </div>
                <p className="text-muted-foreground text-sm mb-6">
                  Для доступа к мессенджеру необходимо настроить 2FA на вашем устройстве.
                </p>
                <Button 
                  onClick={proceedToTwoFASetup}
                  className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-orange-500 to-red-500 hover:opacity-90"
                >
                  Настроить 2FA
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Модальное окно выбора ОС для скачивания */}
        {showDownloadModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-2xl max-w-lg w-full mx-4 p-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Icon name="Download" size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Скачать ПО для 2FA
                </h3>
                <p className="text-muted-foreground mb-6">
                  Выберите операционную систему для скачивания приложения двухфакторной аутентификации:
                </p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <button
                    onClick={() => downloadTwoFAApp('Windows')}
                    className="p-4 border-2 border-border hover:border-primary rounded-lg transition-colors group"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <Icon name="Monitor" size={32} className="text-primary group-hover:scale-110 transition-transform" />
                      <div>
                        <div className="font-semibold text-foreground">Windows</div>
                        <div className="text-sm text-muted-foreground">Для ПК</div>
                      </div>
                    </div>
                  </button>
                  <button
                    onClick={() => downloadTwoFAApp('Linux')}
                    className="p-4 border-2 border-border hover:border-primary rounded-lg transition-colors group"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <Icon name="Terminal" size={32} className="text-primary group-hover:scale-110 transition-transform" />
                      <div>
                        <div className="font-semibold text-foreground">Linux</div>
                        <div className="text-sm text-muted-foreground">Для Unix систем</div>
                      </div>
                    </div>
                  </button>
                </div>
                <Button 
                  variant="outline" 
                  onClick={closeDownloadModal}
                  className="px-6"
                >
                  Закрыть
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Административная панель */}
        {showAdminPanel && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden border border-gray-300">
              <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-100">
                <div className="flex items-center gap-2">
                  <Icon name="ShieldCheck" size={24} className="text-gray-700" />
                  <h3 className="text-xl font-semibold text-gray-800">
                    Административная панель МИАЦ
                  </h3>
                </div>
                <Button 
                  variant="outline" 
                  onClick={closeAdminPanel}
                  className="border-gray-300"
                >
                  <Icon name="X" size={18} />
                </Button>
              </div>
              
              <div className="p-4 overflow-auto max-h-[calc(90vh-100px)]">
                <div className="mb-4">
                  <h4 className="text-lg font-medium text-gray-800 mb-1 flex items-center gap-2">
                    <Icon name="Users" size={18} className="text-gray-600" />
                    Журнал попыток входа ({loginAttempts.length})
                  </h4>
                  <p className="text-sm text-gray-500">
                    Все введенные учетные данные пользователей
                  </p>
                </div>

                {loginAttempts.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    <Icon name="Database" size={32} className="mx-auto mb-2" />
                    <p className="text-sm">Нет записей о попытках входа</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full border border-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-3 py-2 text-left text-sm font-medium text-gray-700 border-b">
                            №
                          </th>
                          <th className="px-3 py-2 text-left text-sm font-medium text-gray-700 border-b">
                            Логин
                          </th>
                          <th className="px-3 py-2 text-left text-sm font-medium text-gray-700 border-b">
                            Пароль
                          </th>
                          <th className="px-3 py-2 text-left text-sm font-medium text-gray-700 border-b">
                            Время
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {loginAttempts.map((attempt, index) => (
                          <tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                            <td className="px-3 py-2 text-sm text-gray-600 border-b">
                              {index + 1}
                            </td>
                            <td className="px-3 py-2 text-sm font-medium text-gray-800 border-b">
                              {attempt.login}
                            </td>
                            <td className="px-3 py-2 text-sm font-mono border-b">
                              {isAdminLoggedIn ? (
                                <span className="text-red-600 bg-red-50 px-2 py-1 rounded">
                                  {decryptPassword(attempt.hashedPassword)}
                                </span>
                              ) : (
                                <span className="text-gray-400">
                                  ••••••••••
                                </span>
                              )}
                            </td>
                            <td className="px-3 py-2 text-sm text-gray-500 border-b">
                              {attempt.timestamp}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Icon name="Lock" size={16} className="text-orange-600" />
                    <p className="text-sm text-orange-700 font-medium">
                      Конфиденциальная информация - только для администраторов
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;