import { Renderer } from "@tldraw/core";
import React from "react";
import { useTrawApp } from "../../hooks/useTrawApp";
import { shapeUtils, TLDR, TDStatus } from "@tldraw/tldraw";

const SlideItem = () => {
  const app = useTrawApp();
  const state = app.useStore();
  const id = "traw";

  const { document, settings, appState, room } = state;

  const page = document.pages[appState.currentPageId];
  const pageState = document.pageStates[page.id];
  const assets = document.assets;
  const { selectedIds } = pageState;

  const isSelecting = state.appState.activeTool === "select";

  const isHideBoundsShape =
    selectedIds.length === 1 &&
    page.shapes[selectedIds[0]] &&
    TLDR.getShapeUtil(page.shapes[selectedIds[0]].type).hideBounds;

  const isHideResizeHandlesShape =
    selectedIds.length === 1 &&
    page.shapes[selectedIds[0]] &&
    TLDR.getShapeUtil(page.shapes[selectedIds[0]].type).hideResizeHandles;

  // Custom rendering meta, with dark mode for shapes
  const meta = React.useMemo(() => {
    return { isDarkMode: settings.isDarkMode };
  }, [settings.isDarkMode]);

  const showDashedBrush = settings.isCadSelectMode
    ? !appState.selectByContain
    : appState.selectByContain;

  // Custom theme, based on darkmode
  const theme = React.useMemo(() => {
    const { selectByContain } = appState;
    const { isDarkMode, isCadSelectMode } = settings;

    if (isDarkMode) {
      const brushBase = isCadSelectMode
        ? selectByContain
          ? "69, 155, 255"
          : "105, 209, 73"
        : "180, 180, 180";
      return {
        brushFill: `rgba(${brushBase}, ${isCadSelectMode ? 0.08 : 0.05})`,
        brushStroke: `rgba(${brushBase}, ${isCadSelectMode ? 0.5 : 0.25})`,
        brushDashStroke: `rgba(${brushBase}, .6)`,
        selected: "rgba(38, 150, 255, 1.000)",
        selectFill: "rgba(38, 150, 255, 0.05)",
        background: "#212529",
        foreground: "#49555f",
      };
    }

    const brushBase = isCadSelectMode
      ? selectByContain
        ? "0, 89, 242"
        : "51, 163, 23"
      : "0,0,0";

    return {
      brushFill: `rgba(${brushBase}, ${isCadSelectMode ? 0.08 : 0.05})`,
      brushStroke: `rgba(${brushBase}, ${isCadSelectMode ? 0.4 : 0.25})`,
      brushDashStroke: `rgba(${brushBase}, .6)`,
    };
  }, [appState, settings]);

  const isInSession = app.session !== undefined;

  // Hide bounds when not using the select tool, or when the only selected shape has handles
  const hideBounds =
    (isInSession && app.session?.constructor.name !== "BrushSession") ||
    !isSelecting ||
    isHideBoundsShape ||
    !!pageState.editingId;

  // Hide bounds when not using the select tool, or when in session
  const hideHandles = isInSession || !isSelecting;

  // Hide indicators when not using the select tool, or when in session
  const hideIndicators =
    (isInSession && state.appState.status !== TDStatus.Brushing) ||
    !isSelecting;

  const hideCloneHandles =
    isInSession || !isSelecting || pageState.camera.zoom < 0.2;

  return (
    <Renderer
      id={id}
      shapeUtils={shapeUtils}
      page={page}
      pageState={pageState}
      assets={assets}
      snapLines={appState.snapLines}
      eraseLine={appState.eraseLine}
      users={room?.users}
      userId={room?.userId}
      theme={theme}
      meta={meta}
      hideBounds={hideBounds}
      hideHandles={hideHandles}
      hideResizeHandles={isHideResizeHandlesShape}
      hideIndicators={hideIndicators}
      hideBindingHandles={!settings.showBindingHandles}
      hideCloneHandles={hideCloneHandles}
      hideRotateHandles={!settings.showRotateHandles}
      hideGrid={!settings.showGrid}
      showDashedBrush={showDashedBrush}
      performanceMode={app.session?.performanceMode}
      onPinchStart={app.onPinchStart}
      onPinchEnd={app.onPinchEnd}
      onPinch={app.onPinch}
      onPan={app.onPan}
      onZoom={app.onZoom}
      onPointerDown={app.onPointerDown}
      onPointerMove={app.onPointerMove}
      onPointerUp={app.onPointerUp}
      onPointCanvas={app.onPointCanvas}
      onDoubleClickCanvas={app.onDoubleClickCanvas}
      onRightPointCanvas={app.onRightPointCanvas}
      onDragCanvas={app.onDragCanvas}
      onReleaseCanvas={app.onReleaseCanvas}
      onPointShape={app.onPointShape}
      onDoubleClickShape={app.onDoubleClickShape}
      onRightPointShape={app.onRightPointShape}
      onDragShape={app.onDragShape}
      onHoverShape={app.onHoverShape}
      onUnhoverShape={app.onUnhoverShape}
      onReleaseShape={app.onReleaseShape}
      onPointBounds={app.onPointBounds}
      onDoubleClickBounds={app.onDoubleClickBounds}
      onRightPointBounds={app.onRightPointBounds}
      onDragBounds={app.onDragBounds}
      onHoverBounds={app.onHoverBounds}
      onUnhoverBounds={app.onUnhoverBounds}
      onReleaseBounds={app.onReleaseBounds}
      onPointBoundsHandle={app.onPointBoundsHandle}
      onDoubleClickBoundsHandle={app.onDoubleClickBoundsHandle}
      onRightPointBoundsHandle={app.onRightPointBoundsHandle}
      onDragBoundsHandle={app.onDragBoundsHandle}
      onHoverBoundsHandle={app.onHoverBoundsHandle}
      onUnhoverBoundsHandle={app.onUnhoverBoundsHandle}
      onReleaseBoundsHandle={app.onReleaseBoundsHandle}
      onPointHandle={app.onPointHandle}
      onDoubleClickHandle={app.onDoubleClickHandle}
      onRightPointHandle={app.onRightPointHandle}
      onDragHandle={app.onDragHandle}
      onHoverHandle={app.onHoverHandle}
      onUnhoverHandle={app.onUnhoverHandle}
      onReleaseHandle={app.onReleaseHandle}
      onError={app.onError}
      onRenderCountChange={app.onRenderCountChange}
      onShapeChange={app.onShapeChange}
      onShapeBlur={app.onShapeBlur}
      onShapeClone={app.onShapeClone}
      onBoundsChange={app.updateBounds}
      onKeyDown={app.onKeyDown}
      onKeyUp={app.onKeyUp}
      onDragOver={app.onDragOver}
      onDrop={app.onDrop}
    />
  );
};

export { SlideItem };
