import { shallowMount } from '@vue/test-utils';
import InfoBar from '@/components/InfoBar.vue';

describe('InfoBar.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount(InfoBar, {
      propsData: { msg }
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
