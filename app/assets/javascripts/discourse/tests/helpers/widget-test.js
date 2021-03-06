import { moduleForComponent } from "ember-qunit";
import componentTest from "discourse/tests/helpers/component-test";
import { addPretenderCallback } from "discourse/tests/helpers/qunit-helpers";

export function moduleForWidget(name, options = {}) {
  let fullName = `widget:${name}`;
  addPretenderCallback(fullName, options.pretend);

  moduleForComponent(
    name,
    fullName,
    Object.assign(
      { integration: true },
      { beforeEach: options.beforeEach, afterEach: options.afterEach }
    )
  );
}

export function widgetTest(name, opts) {
  return componentTest(name, opts);
}
