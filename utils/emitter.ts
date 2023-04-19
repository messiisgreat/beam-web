export enum UserInteractionEvents {
  PAGE_TRANSITION_FINISHED = "pageTransitionFinished",
  LANGUAGE_CHANGE = "languageChange",
  SCROLL_TO_WHERE_TO_BUY = "scrollToWhereToBuy",
  SCROLL_TO_GET_STARTED = "scrollToGetStarted",
  EXIT_LANGUAGE_DROPDOWN = "exitLanguageDropdown",
}

export interface CustomEvents {
  [UserInteractionEvents.PAGE_TRANSITION_FINISHED]: {};
  [UserInteractionEvents.LANGUAGE_CHANGE]: {
    lang: string;
  };
  [UserInteractionEvents.SCROLL_TO_WHERE_TO_BUY]: {};
  [UserInteractionEvents.SCROLL_TO_GET_STARTED]: {};
  [UserInteractionEvents.EXIT_LANGUAGE_DROPDOWN]: {};
}

type Handler<T = any> = (event: T) => void;

class CustomEmitter {
  private eventHandlers: {
    [key in keyof CustomEvents]?: Array<Handler<CustomEvents[key]>>;
  } = {};

  on<Key extends keyof CustomEvents>(
    type: Key,
    handler: Handler<CustomEvents[Key]>
  ): void {
    if (!this.eventHandlers[type]) {
      this.eventHandlers[type] = [];
    }
    this.eventHandlers[type]?.push(handler);
  }

  off<Key extends keyof CustomEvents>(
    type: Key,
    handler: Handler<CustomEvents[Key]>
  ): void {
    this.eventHandlers[type] = this.eventHandlers[type]?.filter(
      (h) => h !== handler
    ) as unknown as any;
  }

  emit<Key extends keyof CustomEvents>(
    type: Key,
    event: CustomEvents[Key]
  ): void {
    this.eventHandlers[type]?.forEach((handler) => handler(event));
  }
}

export const eventBus = new CustomEmitter();

export default eventBus;