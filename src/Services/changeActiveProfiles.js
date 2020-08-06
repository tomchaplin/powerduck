export default (profiles) => {
  const lightingArg = profiles.lighting ? profiles.lighting : '-';
  const coolingArg = profiles.cooling ? profiles.cooling : '-';
  const baseCommand = './powerduckling';
  const fullCommand = `${baseCommand} ${lightingArg} ${coolingArg}`;
  return new Promise((resolve, reject) => {
    Neutralino.os.runCommand(
      fullCommand,
      (data) => {
        resolve(data.stdout);
      },
      () => {
        reject('command error');
      }
    );
  });
};
