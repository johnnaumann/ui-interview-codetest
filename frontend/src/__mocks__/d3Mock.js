// Comprehensive D3 mock for testing
const createMockAppend = () => {
  const mockAppend = jest.fn(() => ({
    attr: jest.fn(() => mockAppend()),
    style: jest.fn(() => mockAppend()),
    on: jest.fn(() => mockAppend()),
    call: jest.fn(() => mockAppend()),
    append: mockAppend,
    text: jest.fn(() => mockAppend()),
    remove: jest.fn(),
    node: jest.fn(() => ({
      getTotalLength: jest.fn(() => 100)
    })),
    transition: jest.fn(() => ({
      duration: jest.fn(() => ({
        ease: jest.fn(() => ({
          attr: jest.fn()
        }))
      })),
      delay: jest.fn(() => ({
        duration: jest.fn(() => ({
          ease: jest.fn(() => ({
            attr: jest.fn()
          }))
        }))
      }))
    }))
  }));
  return mockAppend;
};

const mockAppend = createMockAppend();

const mockSelect = jest.fn(() => ({
  select: jest.fn(() => ({
    empty: jest.fn(() => false),
    remove: jest.fn(),
    attr: jest.fn(() => mockAppend()),
    style: jest.fn(() => mockAppend()),
    on: jest.fn(() => mockAppend()),
    call: jest.fn(() => mockAppend()),
    append: mockAppend,
  })),
  selectAll: jest.fn(() => ({
    remove: jest.fn(),
    attr: jest.fn(() => mockAppend()),
    style: jest.fn(() => mockAppend()),
    on: jest.fn(() => mockAppend()),
    call: jest.fn(() => mockAppend()),
    append: mockAppend,
  })),
  attr: jest.fn(() => mockAppend()),
  style: jest.fn(() => mockAppend()),
  on: jest.fn(() => mockAppend()),
  call: jest.fn(() => mockAppend()),
  append: mockAppend,
}));

module.exports = {
  select: mockSelect,
  scaleLinear: jest.fn(() => ({
    domain: jest.fn(() => ({
      range: jest.fn(() => ({
        nice: jest.fn(),
      })),
    })),
  })),
  scaleTime: jest.fn(() => ({
    domain: jest.fn(() => ({
      range: jest.fn(() => ({
        nice: jest.fn(),
      })),
    })),
  })),
  line: jest.fn(() => ({
    x: jest.fn(() => ({
      y: jest.fn(() => ({
        curve: jest.fn(),
      })),
    })),
  })),
  axisBottom: jest.fn(() => ({
    scale: jest.fn(() => ({
      tickFormat: jest.fn(),
    })),
    tickFormat: jest.fn(),
  })),
  axisLeft: jest.fn(() => ({
    scale: jest.fn(),
  })),
  timeFormat: jest.fn(() => jest.fn()),
  format: jest.fn(() => jest.fn()),
  extent: jest.fn(() => [new Date(), new Date()]),
  max: jest.fn(() => 100),
  min: jest.fn(() => 0),
  curveMonotoneX: jest.fn(),
  easeLinear: jest.fn(),
};
