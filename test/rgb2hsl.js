import chai from 'chai';

const expect = chai.expect;

import rgb2hsl from '../src/rgb2hsl';

describe('rgb2hsl', () => {
  it('is expected to be a function', () => {
    expect(rgb2hsl).to.be.a('function');
  });

  it('is expected to convert rgb to hsl', () => {
    expect(rgb2hsl([0, 0, 0])).to.deep.equal([0, 0, 0]);
    expect(rgb2hsl([0, 0, 127])).to.deep.equal([240, 100, 25]);
    expect(rgb2hsl([0, 0, 255])).to.deep.equal([240, 100, 50]);
    expect(rgb2hsl([0, 127, 0])).to.deep.equal([120, 100, 25]);
    expect(rgb2hsl([0, 127, 127])).to.deep.equal([180, 100, 25]);
    expect(rgb2hsl([0, 127, 255])).to.deep.equal([210, 100, 50]);
    expect(rgb2hsl([0, 255, 0])).to.deep.equal([120, 100, 50]);
    expect(rgb2hsl([0, 255, 127])).to.deep.equal([150, 100, 50]);
    expect(rgb2hsl([0, 255, 255])).to.deep.equal([180, 100, 50]);
    expect(rgb2hsl([127, 0, 0])).to.deep.equal([0, 100, 25]);
    expect(rgb2hsl([127, 0, 127])).to.deep.equal([300, 100, 25]);
    expect(rgb2hsl([127, 0, 255])).to.deep.equal([270, 100, 50]);
    expect(rgb2hsl([127, 127, 0])).to.deep.equal([60, 100, 25]);
    expect(rgb2hsl([127, 127, 127])).to.deep.equal([0, 0, 50]);
    expect(rgb2hsl([127, 127, 255])).to.deep.equal([240, 100, 75]);
    expect(rgb2hsl([127, 255, 0])).to.deep.equal([90, 100, 50]);
    expect(rgb2hsl([127, 255, 127])).to.deep.equal([120, 100, 75]);
    expect(rgb2hsl([127, 255, 255])).to.deep.equal([180, 100, 75]);
    expect(rgb2hsl([255, 0, 0])).to.deep.equal([0, 100, 50]);
    expect(rgb2hsl([255, 0, 127])).to.deep.equal([330, 100, 50]);
    expect(rgb2hsl([255, 0, 255])).to.deep.equal([300, 100, 50]);
    expect(rgb2hsl([255, 127, 0])).to.deep.equal([30, 100, 50]);
    expect(rgb2hsl([255, 127, 127])).to.deep.equal([0, 100, 75]);
    expect(rgb2hsl([255, 127, 255])).to.deep.equal([300, 100, 75]);
    expect(rgb2hsl([255, 255, 0])).to.deep.equal([60, 100, 50]);
    expect(rgb2hsl([255, 255, 127])).to.deep.equal([60, 100, 75]);
    expect(rgb2hsl([255, 255, 255])).to.deep.equal([0, 0, 100]);
  });
});
