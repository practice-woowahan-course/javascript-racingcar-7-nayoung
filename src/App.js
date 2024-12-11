// 14:30분 시작
import { MissionUtils } from "@woowacourse/mission-utils";
import Car from "./Car.js";

class App {
  async run() {
    const inputNames = await MissionUtils.Console.readLineAsync('경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)\n');
    const inputAttempts = await MissionUtils.Console.readLineAsync('시도할 횟수는 몇 회인가요?\n');

    if (isNaN(inputAttempts) || parseInt(inputAttempts) < 0) {
      throw new Error('[ERROR] 유효한 횟수를 입력해주세요.');
    }
    let playTime = parseInt(inputAttempts);

    const eachNames = inputNames.split(',');
    if (eachNames.some((name) => name.length > 5)) {
      throw new Error('[ERROR] 자동차 이름은 5자 이하만 가능합니다.');
    };

    const carList = [];
    eachNames.forEach((name) => {
      carList.push(new Car(name));
    });

    MissionUtils.Console.print('실행 결과');
    while (playTime > 0) {
      carList.forEach((car) => {
        if (MissionUtils.Random.pickNumberInRange(0, 9) >= 4) {
          car.advance();
        };
      });
      carList.forEach(car => {
        MissionUtils.Console.print(`${car.getName()} : ${'-'.repeat(car.getAdvanceNumber())}`);
      });
      MissionUtils.Console.print('');
      playTime--;
    }

    let maxAdvance = -1;
    let winner = [];

    carList.forEach((car) => {
      const carMoveDistance = car.getAdvanceNumber();
      if (carMoveDistance > maxAdvance) {
        maxAdvance = carMoveDistance;
        winner = [car.getName()];
      } else if (carMoveDistance === maxAdvance) {
        winner.push(car.getName());
      }
    });

    MissionUtils.Console.print(`최종 우승자 : ${winner.join(", ")}`);

  }
}

export default App;
