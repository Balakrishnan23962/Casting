const context = cast.framework.CastReceiverContext.getInstance();
const playerManager = context.getPlayerManager();

// Intercept LOAD requests so you can inspect/customize what the sender sent
playerManager.setMessageInterceptor(
  cast.framework.messages.MessageType.LOAD,
  (loadRequestData) => {
    console.log('LOAD request:', loadRequestData);

    // Example: read your custom metadata keys sent from CastManager.swift
    const metadata = loadRequestData.media && loadRequestData.media.metadata;
    if (metadata) {
      console.log('contentId:', metadata.contentId);
      console.log('seasonId:', metadata.seasonId);
    }

    return loadRequestData;
  }
);

const options = new cast.framework.CastReceiverOptions();
context.start(options);
