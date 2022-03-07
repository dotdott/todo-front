import { render, waitFor } from "src/util/test-utils";
import Drawer from "..";

const openDrawer = jest.fn(() => true);
const handleToggleDrawer = openDrawer.mockReturnValue(!openDrawer());

describe("Drawer component", () => {
  it("render component correctly", () => {
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
});
