import chai from 'chai';

const expect = chai.expect;

import hsl2rgb from '../src/hsl2rgb';

describe('hsl2rgb', () => {
  it('is expected to be a function', () => {
    expect(hsl2rgb).to.be.a('function');
  });

  it('is expected to convert rgb to hsl', () => {
    expect(hsl2rgb([0, 0, 0])).to.deep.equal([0, 0, 0]);
    expect(hsl2rgb([0, 0, 25])).to.deep.equal([64, 64, 64]);
    expect(hsl2rgb([0, 0, 50])).to.deep.equal([128, 128, 128]);
    expect(hsl2rgb([0, 0, 75])).to.deep.equal([191, 191, 191]);
    expect(hsl2rgb([0, 0, 100])).to.deep.equal([255, 255, 255]);
    expect(hsl2rgb([0, 25, 50])).to.deep.equal([159, 96, 96]);
    expect(hsl2rgb([0, 50, 50])).to.deep.equal([191, 64, 64]);
    expect(hsl2rgb([0, 75, 50])).to.deep.equal([223, 32, 32]);
    expect(hsl2rgb([0, 100, 50])).to.deep.equal([255, 0, 0]);
    expect(hsl2rgb([30, 100, 50])).to.deep.equal([255, 128, 0]);
    expect(hsl2rgb([60, 100, 25])).to.deep.equal([128, 128, 0]);
    expect(hsl2rgb([60, 100, 50])).to.deep.equal([255, 255, 0]);
    expect(hsl2rgb([60, 100, 75])).to.deep.equal([255, 255, 128]);
    expect(hsl2rgb([90, 100, 50])).to.deep.equal([128, 255, 0]);
    expect(hsl2rgb([120, 100, 25])).to.deep.equal([0, 128, 0]);
    expect(hsl2rgb([120, 100, 50])).to.deep.equal([0, 255, 0]);
    expect(hsl2rgb([120, 100, 75])).to.deep.equal([128, 255, 128]);
    expect(hsl2rgb([150, 100, 50])).to.deep.equal([0, 255, 128]);
    expect(hsl2rgb([180, 100, 25])).to.deep.equal([0, 128, 128]);
    expect(hsl2rgb([180, 100, 50])).to.deep.equal([0, 255, 255]);
    expect(hsl2rgb([180, 100, 75])).to.deep.equal([128, 255, 255]);
    expect(hsl2rgb([210, 100, 50])).to.deep.equal([0, 128, 255]);
    expect(hsl2rgb([240, 100, 25])).to.deep.equal([0, 0, 128]);
    expect(hsl2rgb([240, 100, 50])).to.deep.equal([0, 0, 255]);
    expect(hsl2rgb([240, 100, 75])).to.deep.equal([128, 128, 255]);
    expect(hsl2rgb([270, 100, 50])).to.deep.equal([128, 0, 255]);
    expect(hsl2rgb([300, 100, 25])).to.deep.equal([128, 0, 128]);
    expect(hsl2rgb([300, 100, 50])).to.deep.equal([255, 0, 255]);
    expect(hsl2rgb([300, 100, 75])).to.deep.equal([255, 128, 255]);
    expect(hsl2rgb([330, 100, 50])).to.deep.equal([255, 0, 128]);
  });
});
