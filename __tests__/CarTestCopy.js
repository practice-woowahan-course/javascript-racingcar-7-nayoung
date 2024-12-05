import Car from '../src/models/Car.js';
import DEFINITION from '../src/constants/Definition.js';

describe('객체 Car 테스트 코드 손 작성 해보기', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test('addCar 메서드 기능 테스트 - 프라이빗 필드에 푸시하는 값이 각각 정확히 되는지를 감시해서 간접적 검증', () => {
    const car = new Car();
    const spyPush = jest.spyOn(Array.prototype, 'push');

    car.addCar(['pobi', 'nori']);

    expect(spyPush).toHaveBeenCalledTimes(2);
    expect(spyPush).toHaveBeenCalledWith({ name: 'pobi', advance: 0 });
    expect(spyPush).toHaveBeenCalledWith({ name: 'nori', advance: 0 });
  });

  test('pickRandomValue 메서드 기능 테스트 - 랜덤값이 범위 안에서 잘 생성되는지 테스트', () => {
    const car = new Car();

    for (let i = 0; i < 100; i++) {
      const randomNumber = car.pickRandomValue();
      const isInteger = Number.isInteger(randomNumber);
      expect(randomNumber).toBeGreaterThanOrEqual(
        DEFINITION.CONDITION.RANDOM_NUMBER_MINIMUM,
      );
      expect(randomNumber).toBeLessThanOrEqual(
        DEFINITION.CONDITION.RANDOM_NUMBER_MAXIMUM,
      );
      expect(isInteger).toBe(true);
    }
  });

  test('isAdvance 메서드 기능 테스트 - 전진 케이스', () => {
    const car = new Car();
    jest.spyOn(car, 'pickRandomValue').mockReturnValue(4);
    expect(car.isAdvance()).toBe(1);
  });

  test('isAdvance 메서드 기능 테스트 - 정지 케이스', () => {
    const car = new Car();
    jest.spyOn(car, 'pickRandomValue').mockReturnValue(3);
    expect(car.isAdvance()).toBe(0);
  });

  test('roundProcess 메서드 기능 테스트 - 우승자 메세지를 잘 리턴하는가?', () => {
    const car = new Car();
    car.addCar(['pobi', 'nori', 'young']);
    jest
      .spyOn(car, 'isAdvance')
      .mockReturnValueOnce(1)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(1);
    expect(car.roundProcess()).toEqual([
      {
        name: 'pobi',
        advance: '-',
      },
      {
        name: 'nori',
        advance: '',
      },
      {
        name: 'young',
        advance: '-',
      },
    ]);
  });

  test('pickWinnerNames 메서드 테스트 - 우승자 이름 잘 출력하는지?', () => {
    const car = new Car();
    car.addCar(['poni', 'nori', 'young']);
    jest
      .spyOn(car, 'isAdvance')
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(1)
      .mockReturnValueOnce(1);

    car.roundProcess();
    expect(car.pickWinnerNames()).toEqual(['nori', 'young']);
  });

  test('generateAdvanceSybol 메서드 테스트', () => {
    const car = new Car();
    expect(car.generateAdvanceSymbol(3)).toEqual('---');
  });
});
