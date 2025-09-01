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
              <Button className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
                Войти
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
      </div>
    </div>
  );
};

export default Index;