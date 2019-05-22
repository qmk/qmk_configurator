<script>
export default {
  name: 'base-keymap',
  methods: {
    calcKeyKeymapDims(w, h) {
      return {
        w:
          w * this.config.KEY_X_SPACING -
          (this.config.KEY_X_SPACING - this.config.KEY_WIDTH),
        h:
          h * this.config.KEY_Y_SPACING -
          (this.config.KEY_Y_SPACING - this.config.KEY_HEIGHT),
        u: h > w ? h : w
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
    calculateMax(newLayout) {
      const layout = this.layouts[newLayout];
      const max = layout.reduce(
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
