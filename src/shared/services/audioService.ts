let audio: HTMLAudioElement | null = null;

export const playAlarmSound = () => {
  if (!audio) {
    audio = new Audio("/sounds/default-alarm.mp3");
    audio.loop = true; 
  }

  audio.play().catch((error) => {
    console.error("Erro ao tentar tocar o som do alarme:", error);
    // Em navegadores modernos, o áudio só pode ser iniciado após uma interação do usuário.
    // O ideal é ter um botão de "Ativar notificações sonoras" ou algo do tipo.
    // Por enquanto, o erro no console nos ajudará a depurar.
  });
};

export const stopAlarmSound = () => {
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
  }
};
