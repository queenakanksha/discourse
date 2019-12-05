import { inject } from "@ember/controller";
import Controller from "@ember/controller";
import { ajax } from "discourse/lib/ajax";
import {
  default as discourseComputed,
  observes
} from "discourse-common/utils/decorators";

export default Controller.extend({
  application: inject(),

  @observes("model.canLoadMore")
  _showFooter() {
    this.set("application.showFooter", !this.get("model.canLoadMore"));
  },

  @discourseComputed("model.content.length")
  hasNotifications(length) {
    return length > 0;
  },

  @discourseComputed("model.content.@each.read")
  allNotificationsRead() {
    return !this.get("model.content").some(
      notification => !notification.get("read")
    );
  },

  actions: {
    resetNew() {
      ajax("/notifications/mark-read", { method: "PUT" }).then(() => {
        this.model.forEach(n => n.set("read", true));
      });
    },

    loadMore() {
      this.model.loadMore();
    }
  }
});
