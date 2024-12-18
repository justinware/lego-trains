import type { MotorOption } from 'johnny-five';

export const M1_CONFIG: MotorOption = {
  pins: {
    pwm: 8,
    dir: 9,
    cdir: 10
  },
  address: 0x60,
  controller: "PCA9685"
};
