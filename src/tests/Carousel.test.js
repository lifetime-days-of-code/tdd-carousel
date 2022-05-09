import React from 'react';
import { shallow } from 'enzyme';
import Carousel, { Carousel as CoreCarousel } from '../Carousel';
import CarouselButton from '../CarouselButton';
import CarouselSlide from '../CarouselSlide';

describe('Carousel', () => {
  let wrapper;

  const slides = [
    {
      imgUrl: 'https://example.com/slide1.png',
      description: 'Slide 1',
      attribution: 'Uno Pizzeria',
    },
    {
      imgUrl: 'https://example.com/slide2.png',
      description: 'Slide 2',
      attribution: 'Dos Equis',
    },
    {
      imgUrl: 'https://example.com/slide3.png',
      description: 'Slide 3',
      attribution: 'Three Amigos',
    },
  ];

  beforeEach(() => {
    wrapper = shallow(<Carousel slides={slides} />);
  });

  it('renders a <main>', () => {
    expect(wrapper.type()).toBe('main');
  });

  it('has an initial `slideIndex` of 0', () => {
    expect(wrapper.state(`slideIndex`)).toBe(0);
  });

  it('renders a CarouselButton labeled Prev', () => {
    expect(
      wrapper
        .find(CarouselButton)
        .at(0)
        .prop('children')
    ).toBe('Prev');
  });

  it('renders a CarouselButton labeled Next', () => {
    expect(
      wrapper
        .find(CarouselButton)
        .at(1)
        .prop('children')
    ).toBe('Next');
  });

  it('decrements `slideIndex` when Prev is clicked', () => {
    wrapper.setState({ slideIndex: 1 });
    wrapper.find('[data-action="prev"]').simulate('click');
    expect(wrapper.state('slideIndex')).toBe(0);
  });

  it('increments `slideIndex` when Next is clicked', () => {
    wrapper.setState({ slideIndex: 1 });
    wrapper.find('[data-action="next"]').simulate('click');
    expect(wrapper.state('slideIndex')).toBe(2);
  });

  it('renders the current slide as a CarouselSlide', () => {
    let slideProps;

    slideProps = wrapper.find(CarouselSlide).props();
    expect(slideProps).toEqual({
      ...CarouselSlide.defaultProps,
      ...slides[0],
    });
 
    wrapper.setProps({ slideIndex: 1 });
    slideProps = wrapper.find('CarouselSlide').props();
    expect(slideProps).toEqual({
      ...CarouselSlide.defaultProps,
      ...slides[1],
    });
     
  });

  it('decrements `slideIndex` when Prev is clicked', () => {
    wrapper.find('[data-action="prev"]').simulate('click');
    expect(slideIndexDecrement).toHaveBeenCalledWith(slides.length);
  })

  
  it('increment `slideIndex` when Next is clicked', () => {
    wrapper.find('[data-action="next"]').simulate('click');
    expect(slideIndexIncrement).toHaveBeenCalledWith(slides.length);
  })
  it('passes defaultImg and defaultImgHeight to the CarouselSlide', () => {
    const defaultImg = () => 'test';
    const defaultImgHeight = 1234;
    wrapper.setProps({ defaultImg, defaultImgHeight });
    expect(wrapper.find(CarouselSlide).prop('Img')).toBe(defaultImg);
    expect(wrapper.find(CarouselSlide).prop('imgHeight')).toBe(
      defaultImgHeight
    );
  });

  it('allows individual slides to override Img and imgHeight', () => {
    const Img = () => 'test';
    const imgHeight = 1234;
    wrapper.setProps({ slides: [{ ...slides[0], Img, imgHeight }] });
    expect(wrapper.find(CarouselSlide).prop('Img')).toBe(Img);
    expect(wrapper.find(CarouselSlide).prop('imgHeight')).toBe(imgHeight);
  });

  describe('with a middle slide selected', () => {
    // 1
    beforeEach(() => {
      wrapper.setState({ slideIndex: 1 });
    });

    it('decrements `slideIndex` when Prev is clicked', () => {
      wrapper.find('[data-action="prev"]').simulate('click');
      expect(wrapper.state('slideIndex')).toBe(0);
    });

    it('increments `slideIndex` when Next is clicked', () => {
      wrapper.setState({ slideIndex: 1 });
      wrapper.find('[data-action="next"]').simulate('click');
      expect(wrapper.state('slideIndex')).toBe(2);
    });
  });

  describe('with the first slide selected', () => {
    it('wraps `slideIndex` to the max value when Prev is clicked', () => {
      wrapper.setState({ slideIndex: 0 });
      wrapper.find('[data-action="prev"]').simulate('click');
      expect(wrapper.state('slideIndex')).toBe(slides.length - 1);
    });
  });

  describe('with the last slide selected', () => {
    it('wraps `slideIndex` to the min value when Next is clicked', () => {
      wrapper.setState({ slideIndex: slides.length - 1 });
      wrapper.find('[data-action="next"]').simulate('click');
      expect(wrapper.state('slideIndex')).toBe(0);
    });
  });

  describe('Component with HOC', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<Carousel slide={slides} />);
    });

    it('set slideIndex={0} on the core component', () => {
      expect(wrapper.find(CoreCarousel).prop('slideIndex')).toBe(0);
    });

    it('passes `slides` down to the core component', () => {
      expect(wrapper.find(CoreCarousel).prop('slides')).toBe(slides);
    });
  });

  describe('Core component', () => {
    // Test against CoreCarousel will go here
  });
});
