import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

interface SecuritySettingsState {
  twoFA: boolean;
  smsCode: boolean;
  emailNotifications: boolean;
}

interface SecuritySettingsProps {
  securitySettings: SecuritySettingsState;
  setSecuritySettings: (settings: SecuritySettingsState) => void;
  handleTwoFAToggle: (checked: boolean) => void;
}

const SecuritySettings: React.FC<SecuritySettingsProps> = ({ 
  securitySettings, 
  setSecuritySettings, 
  handleTwoFAToggle 
}) => {
  return (
    <div className="max-w-4xl mx-auto mt-12">
      <Card className="backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-2xl font-bold text-white flex items-center justify-center gap-2">
            <Icon name="Shield" size={24} />
            Настройки безопасности
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-center justify-between p-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
              <div className="flex items-center gap-3">
                <Icon name="Smartphone" size={20} className="text-white/70" />
                <Label htmlFor="twoFA" className="font-medium text-white/90">Двухфакторная аутентификация</Label>
              </div>
              <Switch
                id="twoFA"
                checked={securitySettings.twoFA}
                onCheckedChange={handleTwoFAToggle}
              />
            </div>
            
            <div className="flex items-center justify-between p-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
              <div className="flex items-center gap-3">
                <Icon name="MessageSquare" size={20} className="text-white/70" />
                <Label htmlFor="smsCode" className="font-medium text-white/90">SMS-коды</Label>
              </div>
              <Switch
                id="smsCode"
                checked={securitySettings.smsCode}
                onCheckedChange={(checked) => setSecuritySettings({ ...securitySettings, smsCode: checked })}
              />
            </div>
            
            <div className="flex items-center justify-between p-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
              <div className="flex items-center gap-3">
                <Icon name="Mail" size={20} className="text-white/70" />
                <Label htmlFor="emailNotifications" className="font-medium text-white/90">Email уведомления</Label>
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

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto mt-12">
        <Card className="backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-white flex items-center justify-center gap-2">
              <Icon name="HelpCircle" size={24} />
              Часто задаваемые вопросы
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="security" className="border border-white/20 rounded-lg px-4 bg-white/5">
                <AccordionTrigger className="text-left hover:no-underline">
                  <div className="flex items-center gap-3">
                    <Icon name="Shield" size={20} className="text-primary" />
                    <span className="font-semibold text-white">Насколько безопасен ваш мессенджер?</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 text-white/70">
                  Наш мессенджер использует военное шифрование AES-256, end-to-end шифрование всех сообщений, 
                  двухфакторную аутентификацию и серверы, расположенные в России. Данные не передаются третьим лицам.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="speed" className="border border-white/20 rounded-lg px-4 bg-white/5">
                <AccordionTrigger className="text-left hover:no-underline">
                  <div className="flex items-center gap-3">
                    <Icon name="Zap" size={20} className="text-secondary" />
                    <span className="font-semibold text-white">Какова скорость доставки сообщений?</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 text-white/70">
                  Среднее время доставки сообщений составляет менее 100 миллисекунд. Используем собственную 
                  инфраструктуру и CDN для максимальной скорости. Поддерживаем офлайн-синхронизацию.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="compliance" className="border border-white/20 rounded-lg px-4 bg-white/5">
                <AccordionTrigger className="text-left hover:no-underline">
                  <div className="flex items-center gap-3">
                    <Icon name="FileCheck" size={20} className="text-primary" />
                    <span className="font-semibold text-white">Соответствует ли система требованиям безопасности?</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 text-white/70">
                  Да, система сертифицирована ФСТЭК, соответствует требованиям 152-ФЗ, имеет сертификат ФСБ 
                  для работы с конфиденциальной информацией и регулярно проходит аудит безопасности.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SecuritySettings;