import { render, waitFor, fireEvent } from "src/util/test-utils";
import Drawer from "..";

const openDrawer = jest.fn(() => true);
const handleToggleDrawer = openDrawer.mockReturnValue(!openDrawer());

describe("Drawer component", () => {
  it("render component correctly when openDrawer status is open", () => {
    const { getByText } = render(
      <Drawer
        openDrawer={openDrawer()}
        handleToggleDrawer={handleToggleDrawer}
      />
    );

    waitFor(() => {
      expect(getByText(/Completados/i)).toBeInTheDocument();
    });
  });

  it("toggle the drawer when clicked in the button to close/open it.", () => {
    const { getByText, getByTestId } = render(
      <Drawer
        openDrawer={openDrawer()}
        handleToggleDrawer={handleToggleDrawer}
      />
    );

    waitFor(() => {
      fireEvent.click(getByTestId("toggle-drawer-test"));
      expect(getByText(/Completados/i)).not.toBeInTheDocument();
    });
  });
});
