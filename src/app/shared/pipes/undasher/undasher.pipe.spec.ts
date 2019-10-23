import { UndasherPipe } from './undasher.pipe';

describe('UndasherPipe', () => {
  let pipe;

  beforeEach(() => pipe = new UndasherPipe());

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return \'\' when given null', () => {
    expect(pipe.transform(null)).toEqual('');
  });

  it('should replace all dashes with spaces', () => {
    const tester = 'lorem-ipsum-dolor-sit-amet';
    const result = pipe.transform(tester);

    expect(result.indexOf('-')).toEqual(-1);
    expect(result).toEqual('lorem ipsum dolor sit amet');
  });

  it('should do nothing if string does not contain any dash', () => {
    const tester = 'lorem ipsum dolor sit amet';
    const result = pipe.transform(tester);

    expect(result).toEqual(tester);
  });
});
