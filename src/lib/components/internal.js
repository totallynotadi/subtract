import { bubble, listen } from "svelte/internal";
import { tabbable } from "tabbable";
import { createFocusTrap } from "focus-trap";
export function externalMouseEvents(
  node,
  options = { type: "click", stopPropagation: false }
) {
  const { type, stopPropagation } = options;
  const handleEvent = (event) => {
    if (stopPropagation) event.stopPropagation();
    if (node && !node.contains(event.target) && !event.defaultPrevented) {
      node.dispatchEvent(
        new CustomEvent(`outer${type}`, {
          detail: event,
        })
      );
    }
  };
  document.addEventListener(type, handleEvent, true);
  return {
    destroy() {
      document.removeEventListener(type, handleEvent, true);
    },
  };
}
// Basic wrapper action around focus-trap
export function focusTrap(node, options) {
  const trap = createFocusTrap(
    node,
    (options = { ...options, fallbackFocus: node })
  );
  trap.activate();
  return {
    destroy() {
      trap.deactivate();
    },
  };
}
// ID generator for handling WAI-ARIA related attributes
export function uid(prefix) {
  return (
    prefix +
    String.fromCharCode(Math.floor(Math.random() * 26) + 97) +
    Math.random().toString(16).slice(2) +
    Date.now().toString(16).split(".")[0]
  );
}
// Controls the focus of a list of elements by using the arrow keys
export function arrowNavigation(
  node,
  options = { preventTab: false, stopPropagation: false }
) {
  const handleKeyDown = (event) => {
    const { key } = event;
    const { activeElement } = document;
    let tabOrder = tabbable(node);
    // if (directChildren) tabOrder = tabOrder.filter(child => child.parentElement === node);
    // @ts-ignore
    const activeIndex = tabOrder.indexOf(document.activeElement);
    if (tabOrder.length < 0) return;
    if (
      key === "ArrowUp" ||
      key === "ArrowDown" ||
      key === "Home" ||
      key === "End" ||
      (key === "Tab" && options.preventTab)
    ) {
      event.preventDefault();
      if (options.stopPropagation) event.stopPropagation();
    }
    if (key === "ArrowUp") {
      if (tabOrder[0] === activeElement) {
        tabOrder[tabOrder.length - 1].focus();
        // @ts-ignore
      } else if (tabOrder.includes(activeElement)) {
        tabOrder[activeIndex - 1].focus();
      }
    } else if (key === "ArrowDown") {
      if (tabOrder[tabOrder.length - 1] === activeElement) {
        tabOrder[0].focus();
        // @ts-ignore
      } else if (tabOrder.includes(activeElement)) {
        tabOrder[activeIndex + 1].focus();
      }
    } else if (key === "Home") {
      tabOrder[0].focus();
    } else if (key === "End") {
      tabOrder[tabOrder.length - 1].focus();
    }
  };
  node.addEventListener("keydown", handleKeyDown);
  return {
    destroy: () => node.removeEventListener("keydown", handleKeyDown),
  };
}
// Returns a number representing the duration of a specified CSS custom property in ms
export function getCSSDuration(property) {
  const duration = window
    .getComputedStyle(document.documentElement)
    .getPropertyValue(property);
  return parseFloat(duration) * (/\ds$/.test(duration) ? 1000 : 1) || 0;
}
// Function for forwarding DOM events to the component's declaration
// Adapted from rgossiaux/svelte-headlessui which is modified from hperrin/svelte-material-ui
export function createEventForwarder(component, exclude = []) {
  // This is our pseudo $on function. It is defined on component mount.
  let $on;
  // This is a list of events bound before mount.
  let events = [];
  // Monkeypatch SvelteComponent.$on with our own forward-compatible version
  component.$on = (eventType, callback) => {
    let destructor = () => {};
    if (exclude.includes(eventType)) {
      // Bail out of the event forwarding and run the normal Svelte $on() code
      const callbacks =
        component.$$.callbacks[eventType] ||
        (component.$$.callbacks[eventType] = []);
      callbacks.push(callback);
      return () => {
        const index = callbacks.indexOf(callback);
        if (index !== -1) callbacks.splice(index, 1);
      };
    }
    if ($on) {
      destructor = $on(eventType, callback); // The event was bound programmatically.
    } else {
      events.push([eventType, callback]); // The event was bound before mount by Svelte.
    }
    return () => destructor();
  };
  return (node) => {
    const destructors = [];
    const forwardDestructors = {};
    const forward = (e) => bubble(component, e);
    // This function is responsible for listening and forwarding
    // all bound events.
    $on = (eventType, callback) => {
      let handler = callback;
      // DOM addEventListener options argument.
      let options = false;
      // Listen for the event directly, with the given options.
      const off = listen(node, eventType, handler, options);
      const destructor = () => {
        off();
        const idx = destructors.indexOf(destructor);
        if (idx > -1) {
          destructors.splice(idx, 1);
        }
      };
      destructors.push(destructor);
      // Forward the event from Svelte.
      if (!(eventType in forwardDestructors)) {
        forwardDestructors[eventType] = listen(node, eventType, forward);
      }
      return destructor;
    };
    // Listen to all the events added before mount.
    for (const event of events) {
      $on(event[0], event[1]);
    }
    return {
      destroy: () => {
        // Remove all event listeners.
        for (const destructor of destructors) {
          destructor();
        }
        // Remove all event forwarders.
        for (let entry of Object.entries(forwardDestructors)) {
          entry[1]();
        }
      },
    };
  };
}
