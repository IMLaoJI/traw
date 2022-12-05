import { Renderer } from "@tldraw/core";
import React from "react";
import { useTrawApp } from "../../hooks/useTrawApp";
import { shapeUtils, TLDR, TDStatus } from "@tldraw/tldraw";
import { useKeyboardShortcuts } from "../../hooks/useKeyboardShortcuts";

const SlideItem = () => {
  const app = useTrawApp();
  const tldrawApp = app.useTldrawApp();
  const state = app.useSlidesStore();
  const id = "traw";
  useKeyboardShortcuts();

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

  const isInSession = tldrawApp.session !== undefined;

  // Hide bounds when not using the select tool, or when the only selected shape has handles
  const hideBounds =
    (isInSession && tldrawApp.session?.constructor.name !== "BrushSession") ||
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
    <>
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
        performanceMode={tldrawApp.session?.performanceMode}
        onPinchStart={tldrawApp.onPinchStart}
        onPinchEnd={tldrawApp.onPinchEnd}
        onPinch={tldrawApp.onPinch}
        onPan={tldrawApp.onPan}
        onZoom={tldrawApp.onZoom}
        onPointerDown={tldrawApp.onPointerDown}
        onPointerMove={tldrawApp.onPointerMove}
        onPointerUp={tldrawApp.onPointerUp}
        onPointCanvas={tldrawApp.onPointCanvas}
        onDoubleClickCanvas={tldrawApp.onDoubleClickCanvas}
        onRightPointCanvas={tldrawApp.onRightPointCanvas}
        onDragCanvas={tldrawApp.onDragCanvas}
        onReleaseCanvas={tldrawApp.onReleaseCanvas}
        onPointShape={tldrawApp.onPointShape}
        onDoubleClickShape={tldrawApp.onDoubleClickShape}
        onRightPointShape={tldrawApp.onRightPointShape}
        onDragShape={tldrawApp.onDragShape}
        onHoverShape={tldrawApp.onHoverShape}
        onUnhoverShape={tldrawApp.onUnhoverShape}
        onReleaseShape={tldrawApp.onReleaseShape}
        onPointBounds={tldrawApp.onPointBounds}
        onDoubleClickBounds={tldrawApp.onDoubleClickBounds}
        onRightPointBounds={tldrawApp.onRightPointBounds}
        onDragBounds={tldrawApp.onDragBounds}
        onHoverBounds={tldrawApp.onHoverBounds}
        onUnhoverBounds={tldrawApp.onUnhoverBounds}
        onReleaseBounds={tldrawApp.onReleaseBounds}
        onPointBoundsHandle={tldrawApp.onPointBoundsHandle}
        onDoubleClickBoundsHandle={tldrawApp.onDoubleClickBoundsHandle}
        onRightPointBoundsHandle={tldrawApp.onRightPointBoundsHandle}
        onDragBoundsHandle={tldrawApp.onDragBoundsHandle}
        onHoverBoundsHandle={tldrawApp.onHoverBoundsHandle}
        onUnhoverBoundsHandle={tldrawApp.onUnhoverBoundsHandle}
        onReleaseBoundsHandle={tldrawApp.onReleaseBoundsHandle}
        onPointHandle={tldrawApp.onPointHandle}
        onDoubleClickHandle={tldrawApp.onDoubleClickHandle}
        onRightPointHandle={tldrawApp.onRightPointHandle}
        onDragHandle={tldrawApp.onDragHandle}
        onHoverHandle={tldrawApp.onHoverHandle}
        onUnhoverHandle={tldrawApp.onUnhoverHandle}
        onReleaseHandle={tldrawApp.onReleaseHandle}
        onError={tldrawApp.onError}
        onRenderCountChange={tldrawApp.onRenderCountChange}
        onShapeChange={tldrawApp.onShapeChange}
        onShapeBlur={tldrawApp.onShapeBlur}
        onShapeClone={tldrawApp.onShapeClone}
        onBoundsChange={tldrawApp.updateBounds}
        onKeyDown={tldrawApp.onKeyDown}
        onKeyUp={tldrawApp.onKeyUp}
        onDragOver={tldrawApp.onDragOver}
        onDrop={tldrawApp.onDrop}
      />
    </>
  );
};

export { SlideItem };
