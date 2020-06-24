<script>
export default {
  name: 'base-keymap',
  computed: {
    styles() {
      let keySize = 0.85;
      let smolKeySize = 0.61;
      if (this.config.SCALE < 1) {
        keySize *= (1 + this.config.SCALE) / 2;
        smolKeySize *= (1 + this.config.SCALE) / 2;
      }
      return {
        '--unit-width': '1',
        '--unit-height': '1',
        '--default-smaller-key-font-size': `${smolKeySize}rem`,
        '--default-key-font-size': `${keySize}rem`,
        '--default-key-height': `${this.config.KEY_HEIGHT}px`,
        '--default-key-width': `${this.config.KEY_WIDTH}px`,
        '--default-key-x-spacing': `${this.config.KEY_X_SPACING}px`,
        '--default-key-y-spacing': `${this.config.KEY_Y_SPACING}px`,
        width: `${this.width}px`,
        height: `${this.height}px`
      };
    }
  },
  methods: {
    calcKeyKeymapDims(w, h) {
      return {
        w:
          w * this.config.KEY_X_SPACING -
          (this.config.KEY_X_SPACING - this.config.KEY_WIDTH),
        h:
          h * this.config.KEY_Y_SPACING -
          (this.config.KEY_Y_SPACING - this.config.KEY_HEIGHT),
        uh: h,
        uw: w
      };
    },
    calcKeyKeymapPos(x, y) {
      return {
        x: x * this.config.KEY_X_SPACING,
        y: y * this.config.KEY_Y_SPACING
      };
    },
    setSize(max) {
      this.width = max.x;
      this.height = max.y;
    },
    calculateMax(layout) {
      const layoutArray = this.layouts[layout];
      const max = layoutArray.reduce(
        (acc, pos) => {
          let _pos = Object.assign({ w: 1, h: 1 }, pos);
          const coor = this.calcKeyKeymapPos(_pos.x, _pos.y);
          const dims = this.calcKeyKeymapDims(_pos.w, _pos.h);
          acc.x = Math.max(acc.x, coor.x + dims.w);
          acc.y = Math.max(acc.y, coor.y + dims.h);
          return acc;
        },
        {
          x: 0,
          y: 0
        }
      );
      if (max.x > this.defaults.MAX_X) {
        this.resizeConfig(max);
        max.x *= this.config.SCALE;
        max.y *= this.config.SCALE;
      }
      return max;
    }
  }
};
</script>
