import React from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface LoginAttempt {
  login: string;
  password: string;
  hashedPassword: string;
  timestamp: string;
}

interface AdminPanelProps {
  showAdminPanel: boolean;
  closeAdminPanel: () => void;
  loginAttempts: LoginAttempt[];
  isAdminLoggedIn: boolean;
  decryptPassword: (encrypted: string) => string;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ 
  showAdminPanel, 
  closeAdminPanel, 
  loginAttempts, 
  isAdminLoggedIn, 
  decryptPassword 
}) => {
  if (!showAdminPanel) return null;

  return (
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
  );
};

export default AdminPanel;