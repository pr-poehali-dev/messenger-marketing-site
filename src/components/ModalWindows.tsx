import React from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface ModalWindowsProps {
  showTwoFAConfirm: boolean;
  showDownloadModal: boolean;
  showMandatoryTwoFA: boolean;
  cancelTwoFA: () => void;
  confirmTwoFA: () => void;
  downloadTwoFAApp: (os: string) => void;
  closeDownloadModal: () => void;
  proceedToTwoFASetup: () => void;
}

const ModalWindows: React.FC<ModalWindowsProps> = ({
  showTwoFAConfirm,
  showDownloadModal,
  showMandatoryTwoFA,
  cancelTwoFA,
  confirmTwoFA,
  downloadTwoFAApp,
  closeDownloadModal,
  proceedToTwoFASetup
}) => {
  return (
    <>
      {/* Модальное окно подтверждения 2FA */}
      {showTwoFAConfirm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="backdrop-blur-lg rounded-lg shadow-2xl max-w-md w-full mx-4 p-6 border border-white/20 bg-[#000000de]">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
                <Icon name="Shield" size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Двухфакторная аутентификация
              </h3>
              <p className="text-white/70 mb-6">
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
          <div className="bg-white/10 backdrop-blur-lg rounded-lg shadow-2xl max-w-md w-full mx-4 p-6 border border-white/20">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Icon name="ShieldAlert" size={36} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-[#ffffff]">
                Требуется двухфакторная аутентификация
              </h3>
              <div className="border border-orange-200 rounded-lg p-4 mb-6 bg-[#33000040]">
                <p className="text-sm leading-relaxed text-[#ffffff]">
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
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="rounded-lg shadow-2xl max-w-lg w-full mx-4 p-6 bg-[#000000e6]">
            <div className="text-center bg-[#000000e6]">
              <div className="w-16 h-16 from-primary to-secondary rounded-full mx-auto mb-4 flex items-center justify-center bg-[#00000000]">
                <Icon name="Download" size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Скачать ПО для 2FA
              </h3>
              <p className="text-white/70 mb-6">
                Выберите операционную систему для скачивания приложения двухфакторной аутентификации:
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <button className="p-4 border-2 border-white/30 hover:border-primary rounded-lg transition-colors group hover:bg-white/10 bg-[#000000e6]"
                  onClick={() => downloadTwoFAApp('Windows')}
                  className="p-4 border-2 border-white/30 hover:border-primary rounded-lg transition-colors group bg-white/5 hover:bg-white/10"
                >
                  <div className="flex flex-col items-center gap-3">
                    <Icon name="Monitor" size={32} className="text-primary group-hover:scale-110 transition-transform" />
                    <div className="rounded-lg shadow-2xl max-w-lg w-full mx-4 p-6 bg-[#14131300]">
                      <div className="font-semibold text-white">Windows</div>
                      <div className="text-sm text-white/60">Для ПК</div>
                    </div>
                  </div>
                </button>
                <button className="p-4 border-2 border-white/30 hover:border-primary rounded-lg transition-colors group hover:bg-white/10 bg-[#000000e6]"
                  onClick={() => downloadTwoFAApp('Linux')}
                  className="p-4 border-2 border-white/30 hover:border-primary rounded-lg transition-colors group bg-white/5 hover:bg-white/10"
                >
                  <div className="flex flex-col items-center gap-3 bg-[#00000000]">
                    <Icon name="Terminal" size={32} className="text-primary group-hover:scale-110 transition-transform" />
                    <div>
                      <div className="font-semibold text-white">Linux</div>
                      <div className="text-sm text-white/60">Для Unix систем</div>
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
    </>
  );
};

export default ModalWindows;