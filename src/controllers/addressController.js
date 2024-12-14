const Address = require('../models/Address');
const User = require('../models/User');

exports.createAddress = async (req, res) => {
  try {
    const { 
      fullAddress, 
      latitude, 
      longitude, 
      houseNumber, 
      apartmentRoad, 
      addressType 
    } = req.body;

    // Create new address
    const newAddress = new Address({
      user: req.user.id,
      fullAddress,
      latitude,
      longitude,
      houseNumber,
      apartmentRoad,
      addressType
    });

    // Save address
    const savedAddress = await newAddress.save();

    // Add address to user's addresses
    await User.findByIdAndUpdate(
      req.user.id, 
      { $push: { addresses: savedAddress._id } },
      { new: true }
    );

    res.status(201).json(savedAddress);
  } catch (error) {
    console.error('Create address error:', error);
    res.status(500).json({ error: 'Failed to create address' });
  }
};

exports.getUserAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({ user: req.user.id });
    res.json(addresses);
  } catch (error) {
    console.error('Get addresses error:', error);
    res.status(500).json({ error: 'Failed to retrieve addresses' });
  }
};

exports.updateAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Ensure the address belongs to the user
    const address = await Address.findOne({ _id: id, user: req.user.id });

    if (!address) {
      return res.status(404).json({ error: 'Address not found' });
    }

    const updatedAddress = await Address.findByIdAndUpdate(
      id, 
      updateData, 
      { new: true }
    );

    res.json(updatedAddress);
  } catch (error) {
    console.error('Update address error:', error);
    res.status(500).json({ error: 'Failed to update address' });
  }
};

exports.deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the address
    const deletedAddress = await Address.findOneAndDelete({ 
      _id: id, 
      user: req.user.id 
    });

    if (!deletedAddress) {
      return res.status(404).json({ error: 'Address not found' });
    }

    // Remove address reference from user
    await User.findByIdAndUpdate(
      req.user.id, 
      { $pull: { addresses: id } }
    );

    res.json({ message: 'Address deleted successfully' });
  } catch (error) {
    console.error('Delete address error:', error);
    res.status(500).json({ error: 'Failed to delete address' });
  }
};